const configServer = async (app, port) => {
    await app.listen(
        port, () => console.log(`server connected to port ${port}`)
    )
}

export default configServer