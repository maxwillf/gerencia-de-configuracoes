package contabilidade.backend;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import contabilidade.backend.controller.BankController;
import contabilidade.backend.model.AccountModel;

import java.util.Map;

@WebMvcTest(BankController.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class BackendApplicationTests {

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Autowired
	private MockMvc mockMvc;

	@Test
	@Order(1)
	void saveAccount() throws Exception {
		AccountModel accountModel = new AccountModel("1", 50.0);

		this.mockMvc.perform(
				post("/account/create/1")
						.content(asJsonString(accountModel)))
						.andDo(print())
						.andExpect(content().string("Conta criada com sucesso. Saldo: 0"));
	}

	@Test
	@Order(2)
	void saveAccountError() throws Exception {
		AccountModel accountModel = new AccountModel("1", 50.0);

		this.mockMvc.perform(
				post("/account/create/1")
						.content(asJsonString(accountModel)))
				.andDo(print())
				.andExpect(content().string("Já existe uma conta com este Id. Tente novamente"));

	}

	@Test
	@Order(3)
	void getExtract() throws Exception {
		this.mockMvc.perform(
				get("/account/extract/1" )
						)
				.andDo(print())
				.andExpect(content().string(containsString("Saldo")));
	}

	@Test
	@Order(4)
	void getExtractError() throws Exception {
		this.mockMvc.perform(
				get("/account/extract/2" )
		)
				.andDo(print())
				.andExpect(content().string("Conta inexistente"));
	}

	@Test
	@Order(5)
	void createSavingsAccount() throws Exception {
		Map<String,String> body = Map.of("balance", "50");
		this.mockMvc.perform(
				post("/savings/create/2").content(
						asJsonString(body)
		).contentType(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(content().string(containsString("Saldo")));
	}

	@Test
	@Order(6)
	void createSavingsAccountError() throws Exception {
		Map<String,String> body = Map.of("balance", "50");
		this.mockMvc.perform(
				post("/savings/create/2").content(
						asJsonString(body)
				).contentType(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(content().string(containsString("Já")));
	}

	@Test
	@Order(7)
	void createSavingsAccountErrorB() throws Exception {
		Map<String,String> body = Map.of();
		this.mockMvc.perform(
				post("/savings/create/3").content(
						asJsonString(body)
				).contentType(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(content().string(containsString("Falha")));
	}

	@Test
	@Order(8)
	void transferOperation() throws Exception {
		Map<String,String> body = Map.of("value", "50");
		this.mockMvc.perform(
				post("/account/1/transfer/2").content(
						asJsonString(body)
				).contentType(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(content().string(containsString("sucesso")));
	}

	@Order(9)
	void transferOperationError() throws Exception {
		Map<String,String> body = Map.of("value", "50");
		this.mockMvc.perform(
				post("/account/2/transfer/4").content(
						asJsonString(body)
				).contentType(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(content().string(containsString("inexistente")));
	}

	@Order(10)
	void transferOperationErrorB() throws Exception {
		Map<String,String> body = Map.of("value", "50");
		this.mockMvc.perform(
				post("/account/4/transfer/2").content(
						asJsonString(body)
				).contentType(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(content().string(containsString("inexistente")));
	}
	@Order(10)
	void transferOperationErrorC() throws Exception {
		Map<String,String> body = Map.of();
		this.mockMvc.perform(
				post("/account/4/transfer/2").content(
						asJsonString(body)
				).contentType(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(content().string(containsString("Falha")));
	}

	@Test
	@Order(11)
	void createBonusAccount() throws Exception {
		this.mockMvc.perform(
				post("/bonus/create/3"))
				.andDo(print())
				.andExpect(content().string(containsString("Saldo")));
	}

	@Test
	@Order(12)
	void createBonusAccountError() throws Exception {
		this.mockMvc.perform(
				post("/bonus/create/3"))
				.andDo(print())
				.andExpect(content().string(containsString("Já")));
	}
}