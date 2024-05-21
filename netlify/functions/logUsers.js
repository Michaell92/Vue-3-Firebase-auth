exports.handler = async (event, context) => {
    try {
        const ip = event.headers['x-forwarded-for'] || event.connection.remoteAddress;

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'IP logged successfully', ip }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
        };
    }
};
