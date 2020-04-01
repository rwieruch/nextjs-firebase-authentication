import firebaseAdmin from '@services/firebase/admin';

export class AdminConnector {
  async getUser(uid: string) {
    return await firebaseAdmin.auth().getUser(uid);
  }

  async setCustomClaims(
    uid: string,
    claims: { [key: string]: Boolean }
  ) {
    const user = await this.getUser(uid);

    return await firebaseAdmin.auth().setCustomUserClaims(uid, {
      ...user.customClaims,
      ...claims,
    });
  }
}
