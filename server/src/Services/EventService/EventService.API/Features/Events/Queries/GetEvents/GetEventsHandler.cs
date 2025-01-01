﻿namespace EventService.API.Features.Events.Queries.GetEvents;

public record GetEventsQuery(
    int Page = 1,
    int PerPage = 10,
    string Keyword = "") : IQuery<GetEventsResult>;
public record GetEventsResult(PaginationResult<EventDto> Events);


public class GetEventsHandler(
    IDocumentSession session,
    IMediaApi mediaService) : IQueryHandler<GetEventsQuery, GetEventsResult>
{
    public async Task<GetEventsResult> Handle(GetEventsQuery query, CancellationToken cancellationToken)
    {
        var eventsQuery = session.Query<Event>()
            .Where(e => e.Status == EventStatus.Approved && e.EndTime <= DateTimeOffset.UtcNow);

        if (!string.IsNullOrWhiteSpace(query.Keyword))
            eventsQuery = eventsQuery.Where(e => e.Name.NgramSearch(query.Keyword) || e.Description.NgramSearch(query.Keyword));

        eventsQuery = eventsQuery.OrderBy(e => e.StartTime);

        var events = await eventsQuery.ToPagedListAsync(query.Page, query.PerPage, cancellationToken);

        var eventDtos = events.ToList().Adapt<List<EventDto>>();

        var imageIds = eventDtos.SelectMany(e =>
        {
            if (e.Item == null) return [e.ImageId];
            return new[] { e.ImageId, e.Item.ImageId };
        });

        var imageUrlsDictionary = await mediaService.GetImageUrlsAsync(imageIds);

        foreach (var eventDto in eventDtos)
        {
            if (imageUrlsDictionary.TryGetValue(eventDto.ImageId, out var eventImageUrl))
            {
                eventDto.Image = eventImageUrl;
            }

            if (eventDto.Item != null)
            {
                if (imageUrlsDictionary.TryGetValue(eventDto.Item.ImageId, out var itemImageUrl))
                {
                    eventDto.Item.Image = itemImageUrl;
                }
            }
        }

        return new GetEventsResult(
            PaginationResult<EventDto>.Create(
                events.PageNumber,
                events.PageSize,
                events.TotalItemCount,
                events.PageCount,
                eventDtos));
    }
}
