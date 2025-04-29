
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Database, BarChart3, Users, AlertTriangle, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

const Sidebar = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    { id: "team-engagement", label: "Team Engagement", checked: false },
    { id: "risk-spikes", label: "Risk Spikes", checked: false },
    { id: "performance-metrics", label: "Performance Metrics", checked: false },
    { id: "customer-satisfaction", label: "Customer Satisfaction", checked: false },
    { id: "project-timelines", label: "Project Timelines", checked: false },
  ]);

  const toggleFilterOption = (id: string) => {
    setFilterOptions(
      filterOptions.map((option) =>
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );
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
            <h3 className="text-sm font-medium mb-3">Analytics Dimensions</h3>
            <div className="space-y-2">
              {filterOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={option.checked}
                    onCheckedChange={() => toggleFilterOption(option.id)}
                  />
                  <label
                    htmlFor={option.id}
                    className={cn("text-sm", 
                      option.checked ? "font-medium text-primary" : "text-muted-foreground"
                    )}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
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
        </div>
      </div>
      
      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground">
          <p>Connected to Analytics Database</p>
          <p className="font-medium text-primary">Status: Demo Mode</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
