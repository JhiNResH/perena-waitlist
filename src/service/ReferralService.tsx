import { PublicKey } from '@solana/web3.js';

export class ReferralService {
  private static GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzuNNizoAFYvG0q2kitX8ryaZt2qpmXpP9RGbv2Tar57mm7UOku-jis5mSXlO6xxQzH/exec';

  static async addReferral(referrerPublicKey: string, referredPublicKey: string): Promise<void> {
    try {
      const response = await fetch(this.GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'addReferral',
          referrerPublicKey,
          referredPublicKey,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add referral');
      }
    } catch (error) {
      console.error('Error adding referral:', error);
      throw error;
    }
  }

  static async getReferrals(publicKey: string): Promise<string[]> {
    try {
      const response = await fetch(`${this.GOOGLE_SHEET_URL}?action=getReferrals&publicKey=${publicKey}`);
      
      if (!response.ok) {
        throw new Error('Failed to get referrals');
      }

      const data = await response.json();
      return data.referrals;
    } catch (error) {
      console.error('Error getting referrals:', error);
      throw error;
    }
  }

  static generateReferralCode(publicKey: PublicKey): string {
    return btoa(publicKey.toBase58()).slice(0, 8);
  }

  static decodeReferralCode(code: string): string {
    return atob(code + '==');
  }
}