import { IRequest, IResponse, INext } from "../interface/vendors"
import BaseError from "../error/baseError";
import query from "../database/dbHelper";
import bcrypt from 'bcryptjs'
import Jwt from "jsonwebtoken";

const AuthModule = {
    login: async (req: IRequest, res: IResponse) => {
        const { userEmail, userPassword } = req.body
        // SEARCH EMAIL 
        query(`SELECT * FROM user WHERE userEmail='${userEmail}'`, {}, async (err: any, rows: any) => {
            if (err) {
                return res.status(400).send({ status: false, data: { msg: 'Something Went Wrong' } })
            }

            if (rows.length !== 0) {
                let userDetail = rows[0]
                let isPasswordvalid = await bcrypt.compare(userPassword, userDetail.userPassword)
                if (isPasswordvalid) {
                    const token = Jwt.sign({
                        userEmail: userEmail
                    }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' })
                    delete userDetail.userPassword
                    // INSERT TOKEN INTO DB
                    query(`INSERT INTO user_session (userId , accessToken) VALUES ('${userDetail.id}','${token}')`, {}, (err: any, rows: any) => {
                        if (err) {
                            return res.status(400).send({ status: false, data: { msg: 'Something Went Wrong' } })
                        }
                        return res.status(200).send({ status: true, data: { userDetail: { ...userDetail }, accessToken: { token: token } } })
                    })
                } else {
                    return res.status(400).send({ status: false, data: { msg: 'Wrong Password' } })
                }

            } else {
                return res.status(400).send({ status: false, data: { msg: 'No Email Found Please Register' } })
            }
        })
    },
    register: async (req: IRequest, res: IResponse) => {
        const { userName, userEmail, userGender, userPhone, userPassword, userStatus, createdAt } = req.body
        // CHECK IF USER EXIST
        query(`SELECT * FROM user WHERE userEmail='${userEmail}'`, {}, async (err: any, rows: any) => {
            if (err) {
                return res.status(400).send({ status: false, data: { msg: 'Something Went Wrong' } })
            }
            if (rows.length === 0) {
                //Encrypt user password
                let encryptedPassword = await bcrypt.hash(userPassword, 10);
                // CREATE RECORD
                query(`INSERT INTO user (userName , userEmail , userGender , userPhone , userPassword , userStatus , createdAt) VALUES ('${userName}' , '${userEmail}' , '${userGender}' , '${userPhone}' , '${encryptedPassword}' , '${userStatus}' , '${createdAt}')`, {}, (err: any, rows: any) => {
                    if (err) {
                        return res.status(400).send({ status: false, data: { msg: 'Something Went Wrong' } })
                    }
                    const token = Jwt.sign({
                        userEmail: userEmail
                    }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' })
                    // FIND USER DETAILS
                    query(`SELECT * FROM user WHERE userEmail='${userEmail}'`, {}, async (err: any, rows: any) => {
                        if (err) {
                            return res.status(400).send({ status: false, data: { msg: 'Something Went Wrong' } })
                        }

                        let userDetail = rows[0]
                        delete userDetail.userPassword
                        // INSERT USER ACCESS TOKEN
                        query(`INSERT INTO user_session (userId , accessToken) VALUES ('${userDetail.id}','${token}')`, {}, (err: any, rows: any) => {
                            if (err) {
                                return res.status(400).send({ status: false, data: { msg: 'Something Went Wrong' } })
                            }
                            return res.status(200).send({ status: true, data: { userDetail: { ...userDetail }, accessToken: { token: token } } })
                        })
                    })

                })
            } else {
                throw new BaseError('Email already registered please try forgotPassword')
            }

        })



    },
    resetPassword: async (req: IRequest, res: IResponse) => {
        const {userEmail , userPassword} = req.body

        query(`SELECT * FROM user WHERE userEmail='${userEmail}'`, {}, async (err: any, rows: any) => {
            if(err){
                return res.status(400).send({ status: false, data: { msg: 'Something Went Wrong' } })
            }
            if(rows.length !== 0){
                let encryptedPassword = await bcrypt.hash(userPassword, 10);
                query(`UPDATE user SET userPassword='${encryptedPassword}'`, {}, async (err: any, rows: any) => {
                    if(err){
                        return res.status(400).send({ status: false, data: { msg: 'Something Went Wrong' } })   
                    }

                    return res.status(200).send({status: true, data: { msg: 'Password reset success please login' }})
                })
            }else{
                return res.status(400).send({ status: false, data: { msg: 'No Email Found Please Register' } })
            }
        })
    },
    logout: async (req: IRequest, res: IResponse) => {
        const {userEmail} = req.body

        query(`SELECT * FROM user WHERE userEmail='${userEmail}'`, {}, async (err: any, rows: any) => {
            if(err){
                return res.status(400).send({ status: false, data: { msg: 'Something Went Wrong' } })
            }
            if(rows.length !== 0){
                let userDetail = rows[0]
                console.log(userDetail);
                
                query(`DELETE FROM user_session WHERE userId='${userDetail.id}'`, {}, async (err: any, rows: any) => {
                    if(err){
                        return res.status(400).send({ status: false, data: { msg: 'Something Went Wrong' } })
                    }
                    return res.status(200).send({ status: true, data: { msg: 'SUCCESS' } })
                })
            }else{
                return res.status(400).send({ status: false, data: { msg: 'No Email Found Please Register' } })
            }
        })
    },
    deleteUser : async (req: IRequest, res: IResponse) => {
        const {userEmail} = req.body

        query(`SELECT * FROM user WHERE userEmail='${userEmail}'`, {}, async (err: any, rows: any) => {
            if(err){
                return res.status(400).send({ status: false, data: { msg: 'Something Went Wrong' } })
            }
            if(rows.length !== 0){
                let userDetail = rows[0]
                query(`DELETE FROM user WHERE userEmail='${userEmail}'`, {}, async (err: any, rows: any) => {
                    if(err){
                        return res.status(400).send({ status: false, data: { msg: 'Something Went Wrong' } })
                    }
                    return res.status(200).send({ status: true, data: { msg: 'SUCCESS' } })
                })
            }else{
                return res.status(400).send({ status: false, data: { msg: 'No Email Found Please Register' } })
            }
        })
    },
    updateUser :async (req: IRequest, res: IResponse) => {
        const { userName, userEmail, userGender, userPhone ,userStatus} = req.body

        query(`SELECT * FROM user WHERE userEmail='${userEmail}'`, {}, async (err: any, rows: any) => {
            if(err){
                return res.status(400).send({ status: false, data: { msg: 'Something Went Wrong' } })
            }
            if(rows.length !== 0){
                query(`UPDATE user SET userName='${userName}' , userGender='${userGender}' , userPhone='${userPhone}' , userStatus='${userStatus}'`, {}, async (err: any, rows: any) => {
                    if(err){
                        return res.status(400).send({ status: false, data: { msg: 'Something Went Wrong' } })   
                    }

                    return res.status(200).send({status: true, data: { msg: 'Record Updated' }})
                })
            }else{
                return res.status(400).send({ status: false, data: { msg: 'No Email Found Please Register' } })
            }
        })
    }
}

export default AuthModule;


