
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { update ,dataLogin }  from '../login/LoginSlice';

export const FnLogut = () => {
    const dispatch = useAppDispatch()
    const tmpData = useAppSelector(dataLogin)
    console.log(tmpData);
}