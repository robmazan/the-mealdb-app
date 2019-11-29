import { renderHook } from "@testing-library/react-hooks";
import { GlobalWithFetchMock } from "jest-fetch-mock";
import { act } from "react-test-renderer";
import useFetch, { LoadingState } from "./useFetch";

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require("jest-fetch-mock");
const fetchMock = customGlobal.fetch;

afterAll(() => {
  fetchMock.resetMocks();
});

type MockResponse = {
  hello: string;
};

it("should return the data (happy path)", async () => {
  const mockResponseBody: MockResponse = { hello: "world" };
  fetchMock.mockResponseOnce(JSON.stringify(mockResponseBody));

  let hookResult: any;

  await act(async () => {
    hookResult = renderHook(() =>
      useFetch<MockResponse>("https://example.com")
    );
  });

  const [mockData, mockLoadingState, mockError] = hookResult!.result.current;

  expect(mockData).toMatchObject(mockResponseBody);
  expect(mockLoadingState).toBe(LoadingState.DONE);
  expect(mockError).toBeNull();
});

it("should return error if fetch fails", async () => {
  const ERROR_MESSAGE = "Fetch error";
  fetchMock.mockRejectOnce(new Error(ERROR_MESSAGE));

  let hookResult: any;

  await act(async () => {
    hookResult = renderHook(() =>
      useFetch<MockResponse>("https://example.com")
    );
  });

  const [mockData, mockLoadingState, mockError] = hookResult!.result.current;

  expect(mockData).toBeUndefined();
  expect(mockLoadingState).toBe(LoadingState.ERROR);
  expect(mockError.message).toEqual(ERROR_MESSAGE);
});

it("should return error if fetch suceeds, but results in HTTP error", async () => {
  const mockFetchResult = { ok: false, status: 500, statusText: "ISE" };

  fetchMock.mockReturnValueOnce(mockFetchResult);

  let hookResult: any;

  await act(async () => {
    hookResult = renderHook(() =>
      useFetch<MockResponse>("https://example.com")
    );
  });

  const [mockData, mockLoadingState, mockError] = hookResult!.result.current;

  expect(mockData).toBeUndefined();
  expect(mockLoadingState).toBe(LoadingState.ERROR);
  expect(mockError.message).toContain("Error");
  expect(mockError.message).toContain(String(mockFetchResult.status));
  expect(mockError.message).toContain(mockFetchResult.statusText);
});

it("should map the data if result mapper is provided", async () => {
  const mockResponseBody: MockResponse = { hello: "world" };
  fetchMock.mockResponseOnce(JSON.stringify(mockResponseBody));

  let hookResult: any;

  type MockMappedResponse = {
    hi: number;
  };
  const mockMappedResponse: MockMappedResponse = { hi: 42 };

  const resultMapper = jest.fn().mockReturnValueOnce(mockMappedResponse);

  await act(async () => {
    hookResult = renderHook(() =>
      useFetch<MockResponse, MockMappedResponse>(
        "https://example.com",
        resultMapper
      )
    );
  });

  const [mockData, mockLoadingState, mockError] = hookResult!.result.current;

  expect(mockData).toMatchObject(mockMappedResponse);
  expect(mockLoadingState).toBe(LoadingState.DONE);
  expect(mockError).toBeNull();
  expect(resultMapper).toHaveBeenCalledTimes(1);
  expect(resultMapper).toHaveBeenCalledWith(mockResponseBody);
});
