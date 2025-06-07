import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as localeData from 'dayjs/plugin/localeData';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/pt-br';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.extend(advancedFormat);

dayjs.locale('pt-br');
dayjs.tz.setDefault('America/Fortaleza');

export default dayjs;
