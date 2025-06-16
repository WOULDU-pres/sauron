
import { useState, useRef, useCallback } from 'react';

const PULL_THRESHOLD = 70; // 새로고침을 트리거하기 위해 당겨야 하는 거리 (px)

export const usePullToRefresh = (onRefresh: () => Promise<any>) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pullPosition, setPullPosition] = useState(0);
    const touchStartY = useRef(0);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (scrollContainerRef.current && scrollContainerRef.current.scrollTop === 0) {
            touchStartY.current = e.targetTouches[0].clientY;
        } else {
            touchStartY.current = 0; // 상단이 아니면 리셋
        }
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (touchStartY.current === 0) return;

        const currentY = e.targetTouches[0].clientY;
        const distance = currentY - touchStartY.current;

        if (distance > 0) {
            setPullPosition(distance);
        }
    }, []);

    const handleTouchEnd = useCallback(async () => {
        if (touchStartY.current === 0) return;

        const wasPulledEnough = pullPosition > PULL_THRESHOLD;
        
        touchStartY.current = 0; // 리셋

        if (wasPulledEnough) {
            setIsRefreshing(true);
            await onRefresh();
            setIsRefreshing(false);
        }
        setPullPosition(0);
    }, [pullPosition, onRefresh]);

    return {
        isRefreshing,
        pullPosition,
        scrollContainerRef,
        pullToRefreshProps: {
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
        },
    };
};
