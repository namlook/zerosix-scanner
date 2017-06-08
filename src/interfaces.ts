
export type SnackbarContext = 'error' | 'info' | 'success' | 'warning' | 'primary' | 'secondary'

export interface Snackbar {
  message: string
  context: SnackbarContext
  display: boolean
  timeout: number
}

export interface Voucher {
  code: string
  name: string
  description: string
  value: number | null
  valueUnit: string | null
  legalNotices: string
  imageUrl: string
  contact: {
    firstName: string
    lastName: string
  },
  used: boolean
  expired: boolean
  expirationDate: string
}