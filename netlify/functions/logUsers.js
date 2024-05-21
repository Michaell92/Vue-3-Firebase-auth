exports.handler = async (event, context) => {
    const ip = event.headers['x-forwarded-for'] || event.connection.remoteAddress;

    console.log('Visitor IP:', ip);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'IP logged successfully', ip }),
    };
};
