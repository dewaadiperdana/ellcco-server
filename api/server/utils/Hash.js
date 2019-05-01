import bcrypt from 'bcrypt';

export default class Hash {
  static async make(text) {
    return new Promise(async (resolve, reject) => {
      try {
        let hash = await bcrypt.hash(text, 10);

        resolve(hash);
      } catch (error) {
        throw error;
      }
    });
  }

  static async check(text, hash) {
    return new Promise(async (resolve, reject) => {
      try {
        let match = await bcrypt.compare(text, hash);

        resolve(match);
      } catch (error) {
        throw error;
      }
    });
  }
}