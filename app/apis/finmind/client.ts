import type {
  FinMindApiResponse,
  FinMindSuccessResponse,
} from '../../interfaces/FinMindResponse'

const FINMIND_API_BASE_URL = 'https://api.finmindtrade.com/api/v4/data'

type FinMindDataParams = Record<string, string | number | undefined>

export class FinMindApiError extends Error {
  status: number

  constructor(message: string, status = 502) {
    super(message)
    this.name = 'FinMindApiError'
    this.status = status
  }
}

export async function fetchFinMindData<
  TResponse extends FinMindSuccessResponse<unknown>,
>(params: FinMindDataParams): Promise<TResponse['data']> {
  const url = new URL(FINMIND_API_BASE_URL)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value))
    }
  })

  const token = process.env.FINMIND_API_TOKEN
  const response = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    next: { revalidate: 60 * 60 },
  })

  if (!response.ok) {
    throw new FinMindApiError('FinMind API request failed', 502)
  }

  const payload = (await response.json()) as FinMindApiResponse<
    TResponse['data']
  >

  if (payload.status === 402) {
    throw new FinMindApiError('FinMind API rate limit exceeded', 503)
  }

  if (payload.status !== 200) {
    throw new FinMindApiError('FinMind API returned an error', 502)
  }

  return payload.data
}
