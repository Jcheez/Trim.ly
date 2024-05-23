import crypto from 'crypto';
import { generatePkcePair } from '@opengovsg/sgid-client';
import { RequestHandler } from 'express';
import { sgid } from '../configs/sgid';
import { CORS_ORIGIN, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_PRIVATEKEY } from '../utils/constants';
import { signTokenPayload } from '../utils/jwt';
import SessionRecord from '../models/sessionRecord.model';
import SocialToken from '../models/socialToken.model';
import User from '../models/user.model';

export const createAuthorizationUrl: RequestHandler = async (req, res) => {
  try {
    // Generate a session ID
    const sessionId = crypto.randomUUID();

    // Generate a PKCE pair
    const { codeChallenge, codeVerifier } = generatePkcePair();

    const { url, nonce } = sgid.authorizationUrl({
      codeChallenge,
      scope: ['openid', 'myinfo.name', 'myinfo.email']
    });

    await SessionRecord.create({
      sessionId,
      nonce,
      codeVerifier
    })

    // Create token to store sessionId
    res.cookie('oauth-session', sessionId, { httpOnly: true });

    return res.status(200).json({
      code: 200,
      redirect: url
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error'
    });
  }
};

export const retrieveAccessTokenAndSub: RequestHandler = async (req, res) => {
  try {
    // Retrieve authCode and sessionId
    const authCode = String(req.query.code)
    const sessionId = String(req.cookies['oauth-session'])

    // Used to extract the id from users table to authenticate user
    let userId;

    // Retrieve session from DB
    const session = await SessionRecord.findOne({ sessionId })

    // Handle situation where there is no such session
    if (!session) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized entry'
      })
    }

    // Exchange the authorization code and code verifier for the access token
    const { accessToken, sub } = await sgid.callback({
      code: authCode,
      nonce: session.nonce,
      codeVerifier: session.codeVerifier,
    })

    // Remove session Record from DB
    await session.deleteOne();

    // Check if Sub is in social Token DB
    const socialTokenFound = await SocialToken.findOne({ provider: 'SP', providerUserId: sub })

    // If Social Token not found, redirect to get credentials
    if (!socialTokenFound) {

      // Request user info using the access token
      const userInfo = await sgid.userinfo({
        accessToken,
        sub
      })

      // Create User in usertable
      const createdUser = await User.create({
        username: userInfo.data['myinfo.name'],
        email: userInfo.data['myinfo.email'].toLowerCase(),
      })

      // Create a Social Token for future retrieval
      await SocialToken.create({
        provider: 'SP',
        providerUserId: userInfo.sub,
        userId: createdUser.id
      })

      userId = createdUser.id
    } else {
      userId = socialTokenFound.userId
    }

    // Retrieve user to add refreshToken
    const userFound = await User.findById(userId)

    // If no such user, return 401
    if (!userFound) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized entry'
      })
    }

    // Create Refresh Token
    const refreshTokenPayload = {
      uuid: userId
    };

    const signedRefreshToken = await signTokenPayload(
      REFRESH_TOKEN_PRIVATEKEY,
      refreshTokenPayload,
      REFRESH_TOKEN_EXPIRY
    );

    // Save refreshToken with currentUser
    await userFound.updateOne({ refreshToken: signedRefreshToken })

    // Store refreshToken in cookie
    res.cookie('jwt', signedRefreshToken, {
      httpOnly: true,
      maxAge: REFRESH_TOKEN_EXPIRY * 1000
    });


    // Redirect user to main landing page
    res.redirect(`${CORS_ORIGIN}/main`)

  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error'
    });
  }
}
