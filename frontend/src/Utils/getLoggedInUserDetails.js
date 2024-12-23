import axios from "axios";
import { backURL } from "../../constants.js";

const getLoggedInUserDetails = async()=>{
    try {
        const res = await axios.get(`${backURL}/api/user/getLoggedInUserDetails`,{
            headers:{
                authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })

        return res?.data
    } catch (error) {
        console.log(error);
        return;
    }
}
export default getLoggedInUserDetails