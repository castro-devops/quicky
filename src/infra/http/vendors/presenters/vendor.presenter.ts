export class VendorPresenter {
  static toHTTP(
    vendor: import('@/domain/vendor/entities/vendor.entity').Vendor,
  ) {
    return {
      id: vendor.id.toValue(),
      name: vendor.name,
      surname: vendor.surname,
      birth: vendor.birth ?? null,
      email: vendor.email,
      phone: vendor.phone,
      companyName: vendor.companyName,
      document: vendor.document,
      status: vendor.status,
      plan: vendor.plan,
      planExpiresAt: vendor.planExpiresAt ?? null,
      createdAt: vendor.createdAt,
      updatedAt: vendor.updatedAt ?? null,
    };
  }
}
