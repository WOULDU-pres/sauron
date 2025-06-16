
import { useState, KeyboardEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from 'lucide-react';

interface KeywordManagerProps {
  label: string;
  keywords: string[];
  onAddKeyword: (keyword: string) => void;
  onRemoveKeyword: (keyword: string) => void;
  placeholder: string;
  badgeClassName?: string;
}

export const KeywordManager = ({ label, keywords, onAddKeyword, onRemoveKeyword, placeholder, badgeClassName }: KeywordManagerProps) => {
  const [newKeyword, setNewKeyword] = useState("");

  const handleAdd = () => {
    const trimmedKeyword = newKeyword.trim();
    if (trimmedKeyword) {
      onAddKeyword(trimmedKeyword);
      setNewKeyword("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg space-y-3">
        <Label className="font-medium text-custom-dark-text text-base">{label}</Label>
        <div className="flex flex-wrap gap-2">
            {keywords.map(keyword => (
                <Badge key={keyword} variant="secondary" className={`pl-3 pr-1 py-1 text-sm ${badgeClassName}`}>
                    {keyword}
                    <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 rounded-full" onClick={() => onRemoveKeyword(keyword)}>
                        <X className="h-3 w-3" />
                    </Button>
                </Badge>
            ))}
        </div>
        <Input 
            placeholder={placeholder}
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
        />
    </div>
  );
};
