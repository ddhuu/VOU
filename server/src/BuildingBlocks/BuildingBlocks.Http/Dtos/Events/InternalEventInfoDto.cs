﻿namespace BuildingBlocks.Http.Dtos.Events;

public class InternalEventInfoDto
{
    public Guid EventId { get; set; }
    public List<InternalVoucherTypeDto> VoucherTypes { get; set; } = new();
    public List<InternalEventGameDto> Games { get; set; } = new();
    public InternalItemDto? Item { get; set; }
}
