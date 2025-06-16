import { useState, useEffect, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { subDays, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { MessageItemProps } from '@/components/MessageItem';
import { AnnouncementRequestItemProps } from '@/components/AnnouncementRequestItem';

const initialLogs: (MessageItemProps & { date: Date })[] = [
  { id: 1, date: new Date('2025-06-15T10:00:00'), type: '광고', room: '주식 정보방', content: '(광고) 절대 후회없는 최고의 선택! 지금 바로 확인하세요! https://example.com', confidence: 98.7, reason: '광고성 문구와 외부 링크가 포함되어 있습니다.' },
  { id: 2, date: new Date('2025-06-15T09:30:00'), type: '도배', room: '자유로운 대화방', content: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ', confidence: 99.9, reason: '반복적인 문자의 사용 빈도가 높습니다.' },
  { id: 3, date: new Date('2025-06-14T21:15:00'), type: '분쟁', room: '게임 토론방', content: '님 실력이 더 문제인듯... 그렇게밖에 못하시나요? 한심하네요 정말.', confidence: 85.2, reason: '공격적이고 비하하는 표현이 포함되어 있습니다.' },
  { id: 4, date: new Date('2025-06-14T15:00:00'), type: '광고', room: '부동산 스터디', content: '[Web발신] 100% 당첨! 지금 바로 확인! 지금 가입하면 5만원 즉시 지급! 조건없이 바로 드립니다!', confidence: 97.1, reason: '전형적인 스팸 광고 패턴과 일치합니다.' },
  { id: 5, date: new Date('2025-06-13T18:45:00'), type: '정상', room: 'IT 개발자 모임', content: '안녕하세요, 오늘 저녁 스터디 참여하시나요?', confidence: 99.8, reason: '일상적인 대화로 판단됩니다.' },
  { id: 6, date: new Date('2025-06-12T11:20:00'), type: '도배', room: '자유로운 대화방', content: '가나다라마바사아자차카타파하', confidence: 95.0, reason: '의미 없는 문자열의 반복입니다.' },
  { id: 7, date: new Date('2025-06-11T13:05:00'), type: '도배', room: '자유로운 대화방', content: '도배도배도배도배도배도배', confidence: 98.0, reason: '특정 단어의 반복입니다.' },
  { id: 8, date: new Date('2025-06-10T10:10:00'), type: '도배', room: '자유로운 대화방', content: '테스트 메시지입니다. 도배 아닙니다.', confidence: 25.0, reason: '도배성 의심 단어가 포함되어 있으나, 문맥상 정상 대화일 가능성이 있습니다.' },
  { id: 9, date: new Date('2025-06-09T22:00:00'), type: '광고', room: '코인 투자방', content: '지금 사면 100배 오를 코인! 정보방 입장하세요. link.gg/coin', confidence: 96.5, reason: '수익을 보장하는 문구와 외부 링크가 포함되어 있습니다.' },
  { id: 10, date: new Date('2025-06-08T19:55:00'), type: '분쟁', room: '정치 토론방', content: '그런식으로 말하지 마세요. 기분 나쁘네요.', confidence: 70.0, reason: '부정적인 감정 표현이 포함되어 있습니다.' },
];

const announcementLogs: AnnouncementRequestItemProps[] = [
    { room: 'IT 개발자 모임', content: '중요 공지: 내일 정기 스터디는 취소되었습니다. 착오 없으시길 바랍니다.' },
    { room: '코인 투자방', content: '필독! A코인 관련 긴급 업데이트 사항입니다. 모두 확인해주세요.' },
    { room: '부동산 스터디', content: '공지사항: 다음 주 모임 장소가 변경되었습니다.'},
];

export function useDetectionLogs() {
  const [isLoading, setIsLoading] = useState(true);
  const [logsData, setLogsData] = useState(initialLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const refreshLogs = async () => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 1200));
    // 실제로는 API를 다시 호출하겠지만, 여기서는 데이터를 섞어서 시뮬레이션합니다.
    setLogsData(prev => [...prev].sort(() => Math.random() - 0.5));
    setIsLoading(false);
  };

  const removeLogs = (idsToRemove: Set<number>) => {
    setLogsData(prev => prev.filter(log => !idsToRemove.has(log.id)));
  };

  const filteredLogs = useMemo(() => logsData.filter(log => {
    const searchMatch = log.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.room.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!date?.from) return searchMatch;

    const logDate = log.date;
    const from = startOfDay(date.from);
    const to = date.to ? endOfDay(date.to) : endOfDay(new Date());

    const dateMatch = isWithinInterval(logDate, { start: from, end: to });

    return searchMatch && dateMatch;
  }), [searchQuery, date, logsData]);

  const filteredAnnouncementLogs = useMemo(() => announcementLogs.filter(log =>
    log.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.room.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  const groupedLogs = useMemo(() => filteredLogs.reduce<Record<string, (MessageItemProps & { date: Date })[]>>((acc, log) => {
    const type = log.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(log);
    return acc;
  }, {}), [filteredLogs]);

  return {
    isLoading,
    refreshLogs,
    searchQuery,
    setSearchQuery,
    date,
    setDate,
    filteredAnnouncementLogs,
    groupedLogs,
    removeLogs,
  };
}
