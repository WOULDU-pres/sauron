import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { FileX2, Search, RefreshCw } from 'lucide-react';
import MessageItem, { MessageItemProps } from './MessageItem';
import MessageDetailModal from './MessageDetailModal';
import { Button } from './ui/button';
import AnnouncementRequestItem from './AnnouncementRequestItem';
import { DatePickerWithRange } from './DatePickerWithRange';
import { useToast } from './ui/use-toast';
import { toast as sonnerToast } from 'sonner';
import DetectionLogViewSkeleton from './DetectionLogViewSkeleton';
import { useDetectionLogs } from '@/hooks/useDetectionLogs';
import EmptyState from './EmptyState';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';

const DetectionLogView = () => {
  const {
    isLoading,
    refreshLogs,
    searchQuery,
    setSearchQuery,
    date,
    setDate,
    filteredAnnouncementLogs,
    groupedLogs,
    removeLogs,
  } = useDetectionLogs();
  
  const { isRefreshing, pullPosition, pullToRefreshProps, scrollContainerRef } = usePullToRefresh(refreshLogs);

  const [selectedMessage, setSelectedMessage] = useState<MessageItemProps | null>(null);
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<string>('전체');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const { toast } = useToast();
  const isSelectionMode = selectedIds.size > 0;

  const handleMessageClick = (message: MessageItemProps) => {
    setSelectedMessage(message);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  const toggleShowAll = (type: string) => {
    setShowAll(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleToggleSelect = (id: number) => {
    setSelectedIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        return newSet;
    });
  };

  const handleAcknowledge = (id: number) => {
    sonnerToast.success(`메시지 #${id}를 확인 완료 처리했습니다.`);
    removeLogs(new Set([id]));
  };

  const handleIgnore = (id: number) => {
    sonnerToast.error(`메시지 #${id}를 무시했습니다.`);
    removeLogs(new Set([id]));
  };

  const handleBatchIgnore = () => {
      toast({
          title: `${selectedIds.size}개의 메시지를 무시했습니다.`,
      });
      removeLogs(selectedIds);
      setSelectedIds(new Set());
  };

  const handleBatchAcknowledge = () => {
    toast({
        title: `${selectedIds.size}개의 메시지를 확인 완료 처리했습니다.`,
    });
    removeLogs(selectedIds);
    setSelectedIds(new Set());
  };

  const typeOrder: Array<MessageItemProps['type']> = ['광고', '도배', '분쟁', '정상'];
  const filterTypes: string[] = ['전체', '공지 요청', '광고', '도배', '분쟁', '정상'];

  if (isLoading && !isRefreshing) {
    return <DetectionLogViewSkeleton />;
  }

  const handleItemClick = (message: MessageItemProps) => {
    if (isSelectionMode) {
      handleToggleSelect(message.id);
    } else {
      handleMessageClick(message);
    }
  };

  const isAllLogsEmpty = filteredAnnouncementLogs.length === 0 && !Object.values(groupedLogs).some(logList => logList.length > 0);

  return (
    <div
      ref={scrollContainerRef}
      className="h-full overflow-y-auto relative"
      {...pullToRefreshProps}
    >
      <div
        className="absolute top-[-60px] left-0 right-0 flex justify-center items-center pointer-events-none transition-transform duration-300"
        style={{ transform: `translateY(${pullPosition}px)` }}
      >
        <div className="bg-white rounded-full p-2 shadow-lg">
          <RefreshCw className={`w-6 h-6 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
        </div>
      </div>
      <div className="p-4 space-y-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-custom-light-text" />
            <Input
              type="text"
              placeholder="로그 검색..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>

        <div className="flex flex-wrap gap-2">
          {filterTypes.map(type => (
            <Button
              key={type}
              variant={activeFilter === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(type)}
              className="rounded-full px-4"
            >
              {type}
            </Button>
          ))}
        </div>

        <div className="space-y-6">
          {activeFilter === '전체' && (
            <>
              {isAllLogsEmpty ? (
                <EmptyState icon={FileX2} title="표시할 로그 없음" description="현재 기간에 해당하는 로그가 없습니다. 기간을 변경해보세요." />
              ) : (
                <>
                  {filteredAnnouncementLogs.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold text-custom-dark-text mb-4">공지 요청</h2>
                      <div className="space-y-3">
                          {filteredAnnouncementLogs.map((msg, index) => (
                              <AnnouncementRequestItem key={index} {...msg} />
                          ))}
                      </div>
                    </div>
                  )}
                  {typeOrder.map(type => {
                    const logs = groupedLogs[type];
                    if (!logs || logs.length === 0) return null;
                    
                    const logsToShow = showAll[type] ? logs : logs.slice(0, 3);

                    return (
                      <div key={type}>
                        <h2 className="text-lg font-bold text-custom-dark-text mb-4">{type}</h2>
                        <div className="space-y-3">
                          {logsToShow.map((msg) => (
                            <MessageItem key={msg.id} {...msg} 
                              isSelected={selectedIds.has(msg.id)}
                              onToggleSelect={handleToggleSelect}
                              onClick={() => handleItemClick(msg)} 
                              isSelectionMode={isSelectionMode}
                              onAcknowledge={handleAcknowledge}
                              onIgnore={handleIgnore}
                            />
                          ))}
                        </div>
                        {logs.length > 3 && (
                          <Button variant="ghost" className="w-full mt-3 flex items-center justify-center gap-2 text-custom-light-text hover:bg-gray-100" onClick={() => toggleShowAll(type)}>
                            {showAll[type] ? '접기' : '더보기'}
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}

          {activeFilter === '공지 요청' && (
            <div>
              {filteredAnnouncementLogs.length > 0 ? (
                <div className="space-y-3">
                  {filteredAnnouncementLogs.map((msg, index) => (
                    <AnnouncementRequestItem key={index} {...msg} />
                  ))}
                </div>
              ) : (
                <EmptyState icon={FileX2} title="공지 요청 로그 없음" description="해당 기간에 공지 요청 로그가 없습니다." />
              )}
            </div>
          )}
          
          {['광고', '도배', '분쟁', '정상'].includes(activeFilter) && (
            <div>
              {(groupedLogs[activeFilter] && groupedLogs[activeFilter].length > 0) ? (
                <div className="space-y-3">
                  {groupedLogs[activeFilter].map((msg) => (
                    <MessageItem key={msg.id} {...msg} 
                      isSelected={selectedIds.has(msg.id)}
                      onToggleSelect={handleToggleSelect}
                      onClick={() => handleItemClick(msg)}
                      isSelectionMode={isSelectionMode}
                      onAcknowledge={handleAcknowledge}
                      onIgnore={handleIgnore}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState icon={FileX2} title={`${activeFilter} 로그 없음`} description={`해당 기간에 ${activeFilter} 유형의 로그가 없습니다.`} />
              )}
            </div>
          )}
        </div>
      </div>
      {isSelectionMode && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-full max-w-[calc(390px-2rem)] bg-gray-800 text-white p-3 rounded-lg flex justify-between items-center shadow-lg z-20 animate-in fade-in slide-in-from-bottom-5">
            <span className="text-sm font-medium">{selectedIds.size}개 선택됨</span>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={handleBatchAcknowledge}>
                  확인 완료
              </Button>
              <Button variant="destructive" size="sm" onClick={handleBatchIgnore}>
                  무시
              </Button>
            </div>
        </div>
      )}
      <MessageDetailModal
        isOpen={!!selectedMessage}
        onOpenChange={(isOpen) => !isOpen && handleCloseModal()}
        message={selectedMessage}
      />
    </div>
  );
};

export default DetectionLogView;
