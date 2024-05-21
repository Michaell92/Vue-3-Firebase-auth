exports.handler = async (event, context) => {
    try {
        const ip = event.headers['x-forwarded-for'] || event.connection.remoteAddress;
        const userAgent = event.headers['user-agent'];

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'IP logged successfully', ip, userAgent }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
        };
    }
};
