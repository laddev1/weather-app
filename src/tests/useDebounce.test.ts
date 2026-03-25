import { renderHook, act } from "@testing-library/react-native";
import { useDebounce } from "@/src/hooks/useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("does not update value before delay", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 300),
      { initialProps: { value: "hello" } },
    );

    rerender({ value: "world" });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe("hello");
  });

  it("updates value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 300),
      { initialProps: { value: "hello" } },
    );

    rerender({ value: "world" });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("world");
  });

  it("resets timer on rapid value changes", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 300),
      { initialProps: { value: "a" } },
    );

    rerender({ value: "ab" });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    rerender({ value: "abc" });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    rerender({ value: "abcd" });
    act(() => {
      jest.advanceTimersByTime(299);
    });

    expect(result.current).toBe("a");

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe("abcd");
  });

  it("works with custom delay", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 500),
      { initialProps: { value: "initial" } },
    );

    rerender({ value: "updated" });

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe("updated");
  });

  it("works with non-string types", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useDebounce(value, 300),
      { initialProps: { value: 0 } },
    );

    rerender({ value: 42 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe(42);
  });
});
