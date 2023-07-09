export default function getDate(date: string): string {
	const d = new Date(date);
	const now = new Date();
	const diff = Math.abs(now.getTime() - d.getTime());

	if (diff < 1000 * 60 * 60 * 24) {
		return d.toLocaleTimeString();
	} else if (diff < 1000 * 60 * 60 * 24 * 365) {
		return d.toLocaleDateString();
	}
	return d.toLocaleString();
}
