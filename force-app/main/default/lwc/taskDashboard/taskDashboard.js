import { LightningElement, wire } from 'lwc';
import getAllTasks from '@salesforce/apex/TaskDashboardController.getAllTasks';

const COLUMNS = [
    { label: 'Task Name', fieldName: 'Name' },
    { label: 'Project', fieldName: 'projectName' },
    { label: 'Due Date', fieldName: 'Due_Date__c', type: 'date' },
    { label: 'Status', fieldName: 'Status__c' },
    { label: 'Priority', fieldName: 'Priority__c' },
    { label: 'Assigned To', fieldName: 'assignedTo' }
];

export default class TaskDashboard extends LightningElement {
    tasks;
    error;
    columns = COLUMNS;

    @wire(getAllTasks)
    wiredTasks({ error, data }) {
        if (data) {
            this.tasks = data.map(task => ({
                ...task,
                projectName: task.Project__r ? task.Project__r.Name : '',
                assignedTo: task.Assigned_To__r ? task.Assigned_To__r.Name : ''
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.tasks = undefined;
            console.error('Error loading tasks:', error);
        }
    }
}
