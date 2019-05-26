import bcrypt from 'bcrypt';

class Hash {
  static async make(text) {
    try {
      let hash = await bcrypt.hash(text, 10);

      return Promise.resolve(hash);
    } catch (error) {
      throw error;
    }
  }

  static async check(text, hash) {
    try {
      let match = await bcrypt.compare(text, hash);

      return Promise.resolve(match);
    } catch (error) {
      throw error;
    }
  }
}

export default Hash;