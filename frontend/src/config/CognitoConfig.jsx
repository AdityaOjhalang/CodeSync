// CognitoConfig.js
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_5zzwpbsJQ', // Replace with your Cognito User Pool ID
    ClientId: '7a7980uog0njpin82p37385bh5' // Replace with your Cognito App Client ID

};

export default new CognitoUserPool(poolData);
