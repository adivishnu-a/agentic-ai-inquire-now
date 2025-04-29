
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DatabaseSchema = () => {
  const tables = [
    {
      name: "users",
      description: "User accounts and authentication data",
      columns: [
        { name: "id", type: "uuid", primaryKey: true, description: "Primary key" },
        { name: "email", type: "varchar", description: "User email address" },
        { name: "name", type: "varchar", description: "User's full name" },
        { name: "team_id", type: "uuid", foreignKey: "teams.id", description: "Associated team" },
        { name: "role", type: "varchar", description: "User role in the system" },
        { name: "created_at", type: "timestamp", description: "Account creation date" },
      ]
    },
    {
      name: "teams",
      description: "Team organization data",
      columns: [
        { name: "id", type: "uuid", primaryKey: true, description: "Primary key" },
        { name: "name", type: "varchar", description: "Team name" },
        { name: "department", type: "varchar", description: "Department name" },
        { name: "manager_id", type: "uuid", foreignKey: "users.id", description: "Team manager" },
        { name: "created_at", type: "timestamp", description: "Team creation date" },
      ]
    },
    {
      name: "engagement_metrics",
      description: "Team engagement survey data",
      columns: [
        { name: "id", type: "uuid", primaryKey: true, description: "Primary key" },
        { name: "team_id", type: "uuid", foreignKey: "teams.id", description: "Associated team" },
        { name: "survey_date", type: "timestamp", description: "Survey date" },
        { name: "engagement_score", type: "decimal", description: "Overall engagement score" },
        { name: "participation_rate", type: "decimal", description: "Survey participation rate" },
        { name: "created_at", type: "timestamp", description: "Record creation date" },
      ]
    },
    {
      name: "risk_incidents",
      description: "Risk and incident tracking",
      columns: [
        { name: "id", type: "uuid", primaryKey: true, description: "Primary key" },
        { name: "category", type: "varchar", description: "Risk category" },
        { name: "severity", type: "integer", description: "Severity level (1-5)" },
        { name: "description", type: "text", description: "Incident description" },
        { name: "team_id", type: "uuid", foreignKey: "teams.id", description: "Associated team" },
        { name: "reported_by", type: "uuid", foreignKey: "users.id", description: "Reporting user" },
        { name: "reported_at", type: "timestamp", description: "Incident report date" },
        { name: "resolved_at", type: "timestamp", description: "Resolution date (if resolved)" },
      ]
    },
    {
      name: "projects",
      description: "Project management data",
      columns: [
        { name: "id", type: "uuid", primaryKey: true, description: "Primary key" },
        { name: "name", type: "varchar", description: "Project name" },
        { name: "description", type: "text", description: "Project description" },
        { name: "team_id", type: "uuid", foreignKey: "teams.id", description: "Owning team" },
        { name: "status", type: "varchar", description: "Project status" },
        { name: "start_date", type: "timestamp", description: "Project start date" },
        { name: "target_end_date", type: "timestamp", description: "Target completion date" },
        { name: "actual_end_date", type: "timestamp", description: "Actual completion date" },
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="flex flex-col pt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Database Schema
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Analytics Database</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This database contains analytics data for team performance, engagement metrics, risk management, and project tracking. 
              Use the tabs below to explore the different tables and their relationships.
            </p>
            
            <Tabs defaultValue="users">
              <TabsList className="mb-4">
                {tables.map(table => (
                  <TabsTrigger key={table.name} value={table.name}>
                    {table.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {tables.map(table => (
                <TabsContent key={table.name} value={table.name}>
                  <div className="rounded-md border">
                    <div className="bg-muted/50 p-4 border-b">
                      <h3 className="font-medium">{table.name}</h3>
                      <p className="text-sm text-muted-foreground">{table.description}</p>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Column</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Constraints</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {table.columns.map(column => (
                            <TableRow key={column.name}>
                              <TableCell>{column.name}</TableCell>
                              <TableCell>{column.type}</TableCell>
                              <TableCell>
                                {column.primaryKey && <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mr-1">PK</span>}
                                {column.foreignKey && <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">FK → {column.foreignKey}</span>}
                              </TableCell>
                              <TableCell>{column.description}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DatabaseSchema;
