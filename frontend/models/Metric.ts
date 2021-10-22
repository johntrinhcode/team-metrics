export default class Metric {
    key: String
    type: IssueType
    leadTime: number
}

enum IssueType {
    Feature,
    Defect,
    Task
}