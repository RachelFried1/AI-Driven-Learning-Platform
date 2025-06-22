import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { PromptHistory } from '../../types';

interface HistoryItemCardProps {
  item: PromptHistory;
  expanded: boolean;
  toggleExpanded: (id: string) => void;
  formatDate: (dateString: string) => string;
}

const HistoryItemCard: React.FC<HistoryItemCardProps> = ({
  item,
  expanded,
  toggleExpanded,
  formatDate,
}) => (
  <Card className="transition-shadow hover:shadow-md">
    <Collapsible open={expanded} onOpenChange={() => toggleExpanded(item.id)}>
      <CollapsibleTrigger asChild>
        <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2 line-clamp-2">
                {item.prompt}
              </CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatDate(item.createdAt)}
                </div>
                <Badge variant="outline">{item.category?.name}</Badge>
                <Badge variant="outline">{item.subCategory?.name}</Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CardContent className="pt-0">
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3 text-gray-900">AI Response:</h4>
            <div className="prose prose-sm max-w-none text-gray-700">
              <ReactMarkdown>{item.response}</ReactMarkdown>
            </div>
          </div>
        </CardContent>
      </CollapsibleContent>
    </Collapsible>
  </Card>
);

export default HistoryItemCard;