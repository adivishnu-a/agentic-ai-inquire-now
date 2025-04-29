
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { BarChart3, LineChart, PieChart, Table, Database, Users, AlertTriangle, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

type VisualizationType = "bar" | "line" | "pie" | "table";

const Sidebar = () => {
  const [selectedVisualizations, setSelectedVisualizations] = useState<VisualizationType[]>(["bar"]);

  const toggleVisualizationType = (type: VisualizationType) => {
    setSelectedVisualizations(prev => {
      if (prev.includes(type)) {
        return prev.filter(item => item !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  return (
    <div className="h-full bg-sidebar flex flex-col border-r">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-primary">AMA Dashboard</h2>
        <p className="text-sm text-muted-foreground mb-4">Analytics Assistant</p>
      </div>
      
      <Separator />
      
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Navigation</h3>
            <div className="space-y-1">
              <Link 
                to="/"
                className="flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors text-sm font-medium"
              >
                <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                Dashboard
              </Link>
              <Link 
                to="/schema"
                className="flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors text-sm font-medium"
              >
                <Database className="h-4 w-4 mr-2 text-primary" />
                Database Schema
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Common Queries</h3>
            <div className="space-y-2">
              <button className="w-full text-left flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors text-sm">
                <Users className="h-4 w-4 mr-2 text-primary" />
                <span className="text-muted-foreground">Team Performance</span>
              </button>
              <button className="w-full text-left flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors text-sm">
                <AlertTriangle className="h-4 w-4 mr-2 text-primary" />
                <span className="text-muted-foreground">Recent Risk Alerts</span>
              </button>
              <button className="w-full text-left flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors text-sm">
                <ListChecks className="h-4 w-4 mr-2 text-primary" />
                <span className="text-muted-foreground">Project Status</span>
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Visualization Type</h3>
            <div className="flex flex-col space-y-2">
              <div className={cn(
                "flex items-center space-x-2 rounded-md p-2 cursor-pointer transition-colors",
                selectedVisualizations.includes("bar") ? "bg-blue-500/10 text-primary" : "hover:bg-muted"
              )} onClick={() => toggleVisualizationType("bar")}>
                <Checkbox 
                  checked={selectedVisualizations.includes("bar")} 
                  id="bar" 
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" 
                  onCheckedChange={() => toggleVisualizationType("bar")}
                />
                <label htmlFor="bar" className="flex flex-1 items-center cursor-pointer">
                  <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">Bar Chart</span>
                </label>
              </div>
              
              <div className={cn(
                "flex items-center space-x-2 rounded-md p-2 cursor-pointer transition-colors",
                selectedVisualizations.includes("line") ? "bg-blue-500/10 text-primary" : "hover:bg-muted"
              )} onClick={() => toggleVisualizationType("line")}>
                <Checkbox 
                  checked={selectedVisualizations.includes("line")} 
                  id="line" 
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" 
                  onCheckedChange={() => toggleVisualizationType("line")}
                />
                <label htmlFor="line" className="flex flex-1 items-center cursor-pointer">
                  <LineChart className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">Line Chart</span>
                </label>
              </div>
              
              <div className={cn(
                "flex items-center space-x-2 rounded-md p-2 cursor-pointer transition-colors",
                selectedVisualizations.includes("pie") ? "bg-blue-500/10 text-primary" : "hover:bg-muted"
              )} onClick={() => toggleVisualizationType("pie")}>
                <Checkbox 
                  checked={selectedVisualizations.includes("pie")} 
                  id="pie" 
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" 
                  onCheckedChange={() => toggleVisualizationType("pie")}
                />
                <label htmlFor="pie" className="flex flex-1 items-center cursor-pointer">
                  <PieChart className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">Pie Chart</span>
                </label>
              </div>
              
              <div className={cn(
                "flex items-center space-x-2 rounded-md p-2 cursor-pointer transition-colors",
                selectedVisualizations.includes("table") ? "bg-blue-500/10 text-primary" : "hover:bg-muted"
              )} onClick={() => toggleVisualizationType("table")}>
                <Checkbox 
                  checked={selectedVisualizations.includes("table")} 
                  id="table" 
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" 
                  onCheckedChange={() => toggleVisualizationType("table")}
                />
                <label htmlFor="table" className="flex flex-1 items-center cursor-pointer">
                  <Table className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">Table View</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
