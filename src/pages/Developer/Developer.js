import {getUserByIdAction, deleteUserAction} from "../../actions/actionCreators";
import connect from "react-redux/es/connect/connect";
import React, {Component} from 'react';
import {BarLoader} from "react-spinners";
import './Developer.sass'
import moment from 'moment'

class Developer extends Component {
    componentDidMount() {
        this.props.getUserByIdAction(this.props.match.params.id);
    }
    
    renderLoader() {
        return <BarLoader sizeUnit={"px"}
                          size={100}
                          color={"blue"}
                          loading={true}
                          width={300}
        />
    }

    renderUser() {
        const {user} = this.props;
        return (
            <>
                <div className={"User-Background"}>
                    <div>
                        <div className={"User-Photo"}>
                        </div>
                        <span className={"User-Name"}>{`${user.firstName} ${user.lastName}`}</span>
                    </div>
                </div>
                <div className={"User-Info"}>
                    <span className={"User-InfoType"}>EMAIL</span>
                    <span className={"User-Value"}>{user.email}</span>
                </div>
                <div className={"User-Splitter"}></div>
                <div className={"User-Info"}>
                    <span className={"User-InfoType"}>CREATED AT</span>
                    <span className={"User-Value"}>{moment(user.createdDay).format("DD.MM.YY HH:mm")}</span>
                </div>
            </>
        );
    }

    render() {
        if(!this.props.user) return <div>{this.renderLoader()}</div>;
        return (
            <div className="User-Container">
                {this.props.isFetching ? this.renderLoader() : this.renderUser()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {user, error, isFetching} = state.userReducer;
    return {user, error, isFetching};
};

const mapDispatchToProps = (dispatch) => ({
    getUserByIdAction: (id) => dispatch(getUserByIdAction(id)),
    deleteUser: (user, history) => dispatch(deleteUserAction(user, history))

});

export default connect(mapStateToProps, mapDispatchToProps)(Developer);