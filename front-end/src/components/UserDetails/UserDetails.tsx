import styles from "./UserDetails.module.scss";
import user_img from "../assets/user_img.jpeg";
import { useGetCurrentUserQuery } from "../../state/auth/authApiSlice";
import { Link } from "react-router-dom";

function UserDetails() {

      const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery({});
    
      console.log(currentUser.firstName + " from user details");

      const joinedOn = new Date(currentUser.createdAt).toLocaleDateString();

    return (
        <section className={styles.details}>
            <div className={styles.details_img}>
                <h2>{currentUser.gamerTag}</h2>
                <img src={user_img} className={styles.placeholder_img}/>
                <Link to="/user">Upload a profile image</Link>
            </div>
            <section>
                <h3>Member since: {joinedOn}</h3>
                <h3>Ranking : </h3>
                {currentUser.points > 0 ? <h3>Accumulated Points: {currentUser.points}</h3> : <h3>Accumulated Points: 0 </h3>}
            </section>
        </section>
    )
}

export default UserDetails;