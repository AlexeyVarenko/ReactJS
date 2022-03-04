import React from 'react';
import styles from './users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { followUsers, unFollowUsers } from '../../api/api';


let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    return (<div>
        <div className={styles.Pages}>
            {pages.map(p => {
                return <span className={props.currentPage === p && styles.selectedPage}
                    onClick={(e) => {
                        props.onPageChanged(p);
                    }}>{p}</span>
            })}

        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img className={styles.UserPhoto} src={u.photos.small != null ? u.photos.small : userPhoto} />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followinginProgress.some (id=>id===u.id)} onClick={() => {
                                props.toggleFollowinginProgress(true, u.id);
                                followUsers(u)
                                    .then(data => {
                                        
                                        if (data.resultCode === 0) {
                                            props.unfollow(u.id);
                                        }
                                        props.toggleFollowinginProgress(false, u.id);
                                    });

                            }}>Unfollow</button>
                            : <button disabled={props.followinginProgress.some (id=>id===u.id)} onClick={() => {
                                props.toggleFollowinginProgress(true, u.id);
                                unFollowUsers(u)
                                    .then(data => {
                                        
                                        if (data.resultCode === 0) {
                                            props.follow(u.id);
                                        }
                                        props.toggleFollowinginProgress(false, u.id);
                                    });

                                props.follow(u.id);

                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
    )
}

export default Users;