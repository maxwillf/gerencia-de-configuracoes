package contabilidade.backend.model;

import lombok.Data;

@Data
public class BonusAccount  extends  AccountModel{
    Integer bonusPoints;

    public BonusAccount(String accountId, Double accountBalance){
        this.accountId = accountId;
        this.accountBalance = accountBalance;
        this.bonusPoints = 10;
    }
}
