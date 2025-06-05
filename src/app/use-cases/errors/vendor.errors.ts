export class BuildVendorError extends Error {
  private readonly _code: string;

  get code(): string {
    return this._code;
  }

  constructor() {
    super('Tivemos um problema na estruturação dos dados');
    this._code = 'vendor.build-vendor';
  }
}
