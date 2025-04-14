public with sharing class TaskDashboardController {
    @AuraEnabled(cacheable=true)
    public static List<Taskp__c> getAllTasks() {
        return [
            SELECT Id, Name, Due_Date__c, Status__c, Priority__c, 
                   Project__c, Project__r.Name
            FROM Taskp__c
            WHERE Assigned_To__c = :UserInfo.getUserId()
            ORDER BY Due_Date__c ASC
        ];
    }
}