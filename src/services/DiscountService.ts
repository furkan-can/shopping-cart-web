import { couponsData } from "../constant";

export class DiscountService {
  // İndirim kodunun geçerli olup olmadığını kontrol eder
  private validateDiscountCode(discountCode: string): void {
    const validCouponIds = couponsData.coupons.map((coupon) =>
      coupon.couponId.toUpperCase()
    );
    if (!validCouponIds.includes(discountCode)) {
      throw new Error("Invalid discount code");
    }
  }

  // İndirim koduna göre indirimli fiyatı hesaplar
  public calculateDiscountedPrice(
    totalPrice: number,
    discountCode: string
  ): number {
    this.validateDiscountCode(discountCode);

    const coupon = couponsData.coupons.find(
      (coupon) => coupon.couponId.toUpperCase() === discountCode
    );

    if (coupon) {
      if (coupon.discountType === "Amount") {
        return totalPrice - coupon.value;
      } else if (coupon.discountType === "Ratio") {
        const discountPercentage = coupon.value / 100;
        return totalPrice * (1 - discountPercentage);
      }
    }

    throw new Error("Invalid discount type");
  }
}
