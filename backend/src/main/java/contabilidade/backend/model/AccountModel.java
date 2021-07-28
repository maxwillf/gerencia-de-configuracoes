package contabilidade.backend.model;

import lombok.Data;

@Data
public class AccountModel {
  public AccountModel() {
    this.accountId = "";
    this.accountBalance = 0.0;
  }

  public AccountModel(String accountId, Double accountBalance) {
    this.accountId = accountId;
    this.accountBalance = accountBalance;
  }

  String accountId;
  Double accountBalance;
}
