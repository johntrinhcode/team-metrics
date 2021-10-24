const excelFileSchema = {
    'ISSUE KEY': {
        prop: 'key',
        type: String,
        required: true
    },
    'ISSUE TYPE': {
        prop: 'type',
        oneOf: [
            'Feature',
            'Defect',
            'Task'
        ],
        required: true
    },
    'ISSUE LEAD TIME': {
        prop: 'leadTime',
        type: Number,
        required: true
    },
    'ISSUE DATE COMPLETED': {
        prop: 'dateCompleted',
        type: Date,
        required: true
    }
}

export default excelFileSchema;