// Document verification status update schedule
export const docVStatusUpdateSchedule = process.env.DOCV_STATUS_UPDATE_SCHEDULE || '*/1 * * * *';
// Delay before starting status check (in seconds)
export const delayBeforeStartCheck = process.env.DELAY_BEFORE_START_STATUS_CHECK || 60;
// Maximum search depth for verification start date (in hours)
export const maxSearchDept = process.env.MAX_SEARCH_DEPT_FOR_START_DATE || 96;
// Transaction status update schedule
export const transactionStatusUpdateSchedule = process.env.TX_STATUS_UPDATE_SCHEDULE || '*/5 * * * *';
