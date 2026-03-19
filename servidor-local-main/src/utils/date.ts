import {format} from 'date-fns';
import { da } from 'date-fns/locale';

export function formatDate(date: string){
    return format(date, 'yyyy-MM-dd');
}

//formata a data de nascimento(DD-MM-YYYY) para o formato (YYYY-MM-DD) para ser guardada na base de dados
export function formatDateToDDMMYYYY(date: string){
    const [day, month, year] = date.split("-")

    return `${year}-${month}-${day}`;
}