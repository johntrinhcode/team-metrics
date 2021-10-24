export class MetricWeek {
    week: Date
    metrics: Metric[]

    numFeatures: number
    numDefects: number
    numTasks: number

    averageOverallLeadTime: number
    averageFeatureLeadTime: number
    averageDefectLeadTime: number
    averageTaskLeadTime: number

    constructor(week: Date, metrics: Metric[]) {
        this.week = week;
        this.metrics = metrics;

        this.numFeatures = metrics.reduce((acc, currentValue) => { return (isFeature(currentValue.type) ? acc + 1 : acc) }, 0);
        this.numDefects = metrics.reduce((acc, currentValue) => { return (isDefect(currentValue.type) ? acc + 1 : acc) }, 0);
        this.numTasks = metrics.reduce((acc, currentValue) => { return (isTask(currentValue.type) ? acc + 1 : acc) }, 0);

        this.averageOverallLeadTime = metrics.reduce((acc, currentValue) => { return acc + currentValue.leadTime; }, 0) / metrics.length;
        this.averageFeatureLeadTime = (this.numFeatures) ? metrics.reduce((acc, currentValue) => { return isFeature(currentValue.type) ? acc + currentValue.leadTime : acc; }, 0) / this.numFeatures : 0;
        this.averageDefectLeadTime = (this.numDefects) ? metrics.reduce((acc, currentValue) => { return isDefect(currentValue.type) ? acc + currentValue.leadTime : acc; }, 0) / this.numDefects : 0;
        this.averageTaskLeadTime = (this.numTasks) ? metrics.reduce((acc, currentValue) => { return isTask(currentValue.type) ? acc + currentValue.leadTime : acc; }, 0) / this.numTasks : 0;
    }
}

export default class Metric {
    key: String
    type: IssueType
    leadTime: number
    dateCompleted: Date
}

export enum IssueType {
    Feature = 'Feature',
    Defect = 'Defect',
    Task = 'Task'
}

function isFeature(type: IssueType) {
    return type.toString() === IssueType.Feature;
}

function isDefect(type: IssueType) {
    return type.toString() === IssueType.Defect;
}

function isTask(type: IssueType) {
    return type.toString() === IssueType.Task;
}