import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

function StarRating({ rate }: { rate: number }) {
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.3;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-0.5 text-yellow-400">
            {[...Array(fullStars)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
            ))}
            {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} />}
            {[...Array(emptyStars)].map((_, i) => (
                <FontAwesomeIcon key={`empty-${i}`} icon={faStar} className="text-gray-300" />
            ))}
            <span className="ml-2 text-xs text-gray-500 font-medium dark:text-yellow-400">{rate}</span>
        </div>
    );
}

export default StarRating