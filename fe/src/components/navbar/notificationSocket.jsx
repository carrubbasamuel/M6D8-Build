import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { IoMdNotificationsOff } from 'react-icons/io';
import { PiBellSimpleBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { socket } from '../../redux/reducers/LoginSlice';
import { fetchNotifications } from '../../redux/reducers/NotificationSlice';
import './styles.css';

export default function NotificationSocket() {
    const dispatch = useDispatch();
    const { notification } = useSelector(state => state.notification);
    const [isNewNotification, setIsNewNotification] = useState(false);

    useEffect(() => {
        socket.on('like', (data) => {
            dispatch(fetchNotifications());
            setIsNewNotification(true);
            toast.success("Someone likes your post!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        });

        socket.on('unlike', () => {
            dispatch(fetchNotifications());
            setIsNewNotification(false);
        });

        socket.on('uncomment', () => {
            dispatch(fetchNotifications());
            setIsNewNotification(false);
        });

        socket.on('comment', (data) => {
            dispatch(fetchNotifications());
            setIsNewNotification(true);
            toast.success("Someone comments on your post!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                progress: undefined,
            });
        });



        return () => {
            socket.disconnect();
        };
    }, [dispatch]);


    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center me-3">
                <Dropdown id='noti'>
                    <div className="d-flex justify-content-center align-items-center" onClick={() => setIsNewNotification(false)}>
                        <Dropdown.Toggle variant={null} className={`position-relative ${notification && notification.length === 0 ? "disabled-button" : ""}`}  >
                            {
                                notification && notification.length === 0 ?
                                    <IoMdNotificationsOff style={{ fontSize: '25px' }} />
                                    :
                                    <>
                                        <PiBellSimpleBold style={{ fontSize: '25px', cursor: 'pointer' }} />
                                        {isNewNotification && <p className='alertnoti'>
                                            <span className="badge bg-danger rounded-pill">!</span>
                                        </p>}
                                    </>
                            }
                        </Dropdown.Toggle>
                    </div>
                    {/* Dropdown.Menu con le notifiche */}
                    <Dropdown.Menu className="custom-dropdown-menu p-3">
                        {notification?.length === 0 && <div className="d-flex flex-column justify-content-center align-items-center">
                            <IoMdNotificationsOff style={{ fontSize: '50px', cursor: 'pointer' }} />
                            <p className='m-2 text-nowrap'>No notifications</p>
                        </div>}
                        {notification && notification.map((noti) => (
                            <>
                                <Dropdown.Item key={noti._id} as={Link} to={`/profile/${noti.sender._id}`}>

                                    <div className="d-flex justify-content-center align-items-center w-100">
                                        <img className="rounded-circle" width={30} height={30} src={noti.sender.avatar} alt="" />
                                        <div className="ms-3 d-flex align-items-center justify-content-between w-100">
                                            <p className="mb-0 me-3">{noti.message}</p>
                                            <img width={50} height={50} src={noti.postId.cover || null } alt="" />
                                        </div>
                                    </div>

                                </Dropdown.Item>
                                <Dropdown.Divider />
                            </>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

            </div>
        </div>
    );
}
