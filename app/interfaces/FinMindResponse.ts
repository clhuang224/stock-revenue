export interface FinMindResponse<
  M extends string,
  S extends number,
  D = undefined,
> {
  msg: M
  status: S
  data: D
}

export type FinMindSuccessResponse<D> = FinMindResponse<'success', 200, D>

export type FinMindRateLimitedResponse = FinMindResponse<
  'Requests reach the upper limit. https://finmindtrade.com/',
  402
>

export type FinMindMissingParameterResponse<P extends string> = FinMindResponse<
  `${P} parameter is missing.`,
  400
>

export type FinMindErrorResponse =
  | FinMindRateLimitedResponse
  | FinMindMissingParameterResponse<string>

export type FinMindApiResponse<D> =
  | FinMindSuccessResponse<D>
  | FinMindErrorResponse
