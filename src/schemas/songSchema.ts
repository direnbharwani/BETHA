const songSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        artist: { type: 'string', minLength: 1 },
        album: { type: 'string' },
        duration: { type: 'integer', minimum: 1 },  // Duration of song in milliseconds
        year: { type: 'integer', minimum: 1800, maximum: new Date().getFullYear() },
    },
    required: ['name', 'artist', 'duration'],
    additionalProperties: false,
};

export default songSchema;
