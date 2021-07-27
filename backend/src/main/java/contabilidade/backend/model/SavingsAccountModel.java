package contabilidade.backend.model;

import contabilidade.backend.model.AccountModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SavingsAccountModel extends AccountModel {

  public SavingsAccountModel(){
    super("0",0.0);
  }

  public SavingsAccountModel(String accountId, Double accountBalance) {
    super(accountId, accountBalance);
  }
}
