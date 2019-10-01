import express from 'express'

interface IError {
    status?: number;
    message?: string
}

export let handleError = ( error: IError, res:express.Response):express.Response => {
    
    return res.status(error.status || 500).json({
        status: error.status,
        message: error.message
    })

}