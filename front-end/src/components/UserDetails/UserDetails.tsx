import { useSelector } from "react-redux";
import styles from "./UserDetails.module.scss";
import { RootState } from "../../state/store";

function UserDetails() {

    const user = useSelector((state: RootState) => state.auth.user);
    console.log(user?.email);

    return (
        <section className={styles.details}>
        </section>
    )
}

export default UserDetails;