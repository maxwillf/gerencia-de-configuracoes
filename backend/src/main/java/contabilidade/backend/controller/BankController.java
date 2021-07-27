package contabilidade.backend.controller;

import contabilidade.backend.model.AccountModel;
import contabilidade.backend.model.SavingsAccountModel;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class BankController {

  private static final Logger log = LoggerFactory.getLogger(
    BankController.class
  );
  private List<AccountModel> accounts = new ArrayList<>();
  private List<SavingsAccountModel> savingsAccounts = new ArrayList<>();

  public BankController() {}

  @PostMapping("/account/create/{accountId}")
  public String createAccount(@PathVariable("accountId") String accountId) {
    for (AccountModel account : accounts) {
      if (account.getAccountId().equals(accountId)) {
        return "Já existe uma conta com este Id. Tente novamente";
      }
    }

    accounts.add(new AccountModel(accountId, 0.0));

    return "Conta criada com sucesso. Saldo: 0";
  }

  @PostMapping("/account/{accountId}/credit")
  public String creditOperation(
    @PathVariable("accountId") String accountId,
    @RequestBody Map<String, String> creditJson
  ) {
    Double creditValue = 0.0;

    try {
      creditValue = Double.parseDouble(creditJson.get("value"));

      if (creditValue <= 0) {
        return "Valor de crédito inválido.";
      }

      for (AccountModel account : accounts) {
        if (account.getAccountId().equals(accountId)) {
          account.setAccountBalance(account.getAccountBalance() + creditValue);
          return (
            "Conta creditada com sucesso. Saldo: " + account.getAccountBalance()
          );
        }
      }

      return "Conta inexistente. Operação de crédito inválida";
    } catch (Exception e) {
      return "Valor de crédito inválido.";
    }
  }

  @PostMapping("/account/{accountId}/debit")
  public String debitOperation(
    @PathVariable("accountId") String accountId,
    @RequestBody Map<String, String> debitJson
  ) {
    Double debitValue = 0.0;

    try {
      debitValue = Double.parseDouble(debitJson.get("value"));

      if (debitValue <= 0) {
        return "Valor de debito inválido.";
      }

      for (AccountModel account : accounts) {
        if (account.getAccountId().equals(accountId)) {
          account.setAccountBalance(account.getAccountBalance() - debitValue);
          return (
            "Conta debitada com sucesso. Saldo: " + account.getAccountBalance()
          );
        }
      }

      return "Conta inexistente. Operação de débito inválida";
    } catch (Exception e) {
      return "Valor de debito inválido.";
    }
  }

  @PostMapping("/account/{fromAccountId}/transfer/{toAccountId}")
  public String debitOperation(
    @PathVariable("fromAccountId") String fromAccountId,
    @PathVariable("toAccountId") String toAccountId,
    @RequestBody Map<String, String> transferJson
  ) {
    Double transferValue = 0.0;
    AccountModel fromAccount = null;
    AccountModel toAccount = null;

    for (AccountModel account : accounts) {
      if (account.getAccountId().equals(fromAccountId)) {
        fromAccount = account;
      } else if (account.getAccountId().equals(toAccountId)) {
        toAccount = account;
      }
    }

    if (fromAccount == null) {
      return "Conta de débito da transferência inexistente";
    }

    if (toAccount == null) {
      return "Conta de crédito da transferência inexistente";
    }

    try {
      transferValue = Double.parseDouble(transferJson.get("value"));

      if (transferValue <= 0) {
        return "Valor de transferencia inválido.";
      }

      fromAccount.setAccountBalance(
        fromAccount.getAccountBalance() - transferValue
      );
      toAccount.setAccountBalance(
        toAccount.getAccountBalance() + transferValue
      );

      return "Valor transferido com sucesso";
    } catch (Exception e) {
      return "Falha na operação de transferência";
    }
  }

  @GetMapping("/account/extract/{accountId}")
  public String getExtract(@PathVariable("accountId") String accountId) {
    for (AccountModel account : accounts) {
      if (account.getAccountId().equals(accountId)) {
        return "Saldo: " + account.getAccountBalance();
      }
    }

    return "Conta inexistente";
  }

  @PostMapping("/savings/create/{accountId}")
  public String createSavingsAccount(
    @PathVariable("accountId") String accountId
  ) {
    for (SavingsAccountModel account : savingsAccounts) {
      if (account.getAccountId().equals(accountId)) {
        return "Já existe uma conta com este Id. Tente novamente";
      }
    }

    savingsAccounts.add(new SavingsAccountModel(accountId, 0.0));

    return "Conta poupança criada com sucesso. Saldo: 0";
  }

  @PostMapping("/savings/interest/{accountId}")
  public String getEarnInterest(
    @PathVariable("accountId") String accountId,
    @RequestBody Map<String, String> transferJson
  ) {
    Double percentageRate = 0.0;

    try {
      percentageRate = Double.parseDouble(transferJson.get("percentage_rate"));

      if (percentageRate < 0) {
        return "Taxa de juros informada é inválida.";
      }

      for (SavingsAccountModel account : savingsAccounts) {
        if (account.getAccountId().equals(accountId)) {
          account.setAccountBalance(account.getAccountBalance() * percentageRate);

          return "Saldo: " + account.getAccountBalance();
        }
      }

      return "Conta inexistente";
    } catch (Exception e) {
      return "Taxa de juros informada é inválida.";
    }
  }
}
